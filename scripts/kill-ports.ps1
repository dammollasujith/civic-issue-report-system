$ErrorActionPreference = 'SilentlyContinue'

if ($args.Count -eq 0) {
  $ports = @(3000, 3001, 3002, 3003, 4000)
} else {
  $ports = @()
  foreach ($a in $args) {
    $n = 0
    if ([int]::TryParse($a, [ref]$n)) { $ports += $n }
  }
}

foreach ($p in $ports) {
  $conns = Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue
  if (-not $conns) { continue }

  # Kill ANY owning process for the port (Listen is the main one),
  # but sometimes Windows reports odd states during fast restarts.
  $pids = $conns |
    Where-Object { $_.OwningProcess -ne 0 } |
    Select-Object -ExpandProperty OwningProcess -Unique

  foreach ($pid in $pids) {
    try {
      $proc = Get-Process -Id $pid -ErrorAction SilentlyContinue
      if ($proc) { Stop-Process -Id $pid -Force }
    } catch { }
  }
}

