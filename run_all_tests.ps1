param()

# Run full test flow: seed events, run unit tests, start server, run integration checks, stop server
Write-Host "Running full test flow from $(Get-Location)"

$PSScriptRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
Set-Location $PSScriptRoot

$python = Join-Path $PSScriptRoot ".venv\Scripts\python.exe"
if (-not (Test-Path $python)) {
    Write-Host "Python not found at $python. Ensure you created the virtualenv (.venv)." -ForegroundColor Red
    exit 1
}

Write-Host "1) Installing test deps (httpx)"
& $python -m pip install httpx > $null

Write-Host "2) Seed events"
& $python -m ai_analytics.app.seed_events

Write-Host "3) Run unit tests (no server needed)"
& $python -m ai_analytics.tests.test_all

Write-Host "4) Start uvicorn server"
$uvicornArgs = @("-m","uvicorn","ai_analytics.app.main:app","--port","9000")
$proc = Start-Process -FilePath $python -ArgumentList $uvicornArgs -PassThru

try {
    # wait for server
    $max = 30
    $ok = $false
    for ($i=0; $i -lt $max; $i++) {
        Start-Sleep -Seconds 1
        try {
            Invoke-RestMethod -Method GET -Uri http://localhost:9000/docs | Out-Null
            $ok = $true; break
        } catch { }
    }
    if (-not $ok) { throw "Server did not start in time" }

    Write-Host "5) Run integration checks"
    Write-Host " - GET /recommend/t1"
    Invoke-RestMethod -Method GET -Uri http://localhost:9000/recommend/t1 | ConvertTo-Json -Depth 5 | Write-Host

    Write-Host " - POST /filter {mood: 'happy'}"
    Invoke-RestMethod -Method POST -Uri http://localhost:9000/filter -ContentType 'application/json' -Body '{"mood":"happy"}' | ConvertTo-Json -Depth 5 | Write-Host

    Write-Host " - GET /events (recent)"
    Invoke-RestMethod -Method GET -Uri http://localhost:9000/events | ConvertTo-Json -Depth 5 | Write-Host

} finally {
    Write-Host "Stopping server (PID $($proc.Id))"
    Stop-Process -Id $proc.Id -Force
}

Write-Host "Full test flow complete"
