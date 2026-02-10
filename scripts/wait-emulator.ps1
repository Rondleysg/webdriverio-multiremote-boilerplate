adb wait-for-device

do {
  $booted = adb shell getprop sys.boot_completed
  Start-Sleep -Seconds 5
} until ($booted -match "1")
