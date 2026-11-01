$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
try {
  Add-Type -AssemblyName System.Windows.Forms
  $dialog = [System.Windows.Forms.FolderBrowserDialog]::new()
  $dialog.Description = 'Elige una carpeta de archivos para Mini Jarvis'
  $dialog.ShowNewFolderButton = $false
  if ($dialog.ShowDialog() -eq [System.Windows.Forms.DialogResult]::OK) {
    [Console]::WriteLine((@{ path=$dialog.SelectedPath } | ConvertTo-Json -Compress))
  } else { [Console]::WriteLine('null') }
} catch { [Console]::WriteLine((@{ error=$_.Exception.Message } | ConvertTo-Json -Compress)); exit 1 }
finally { if ($null -ne $dialog) { $dialog.Dispose() } }
