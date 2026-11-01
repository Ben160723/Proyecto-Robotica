$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
function Emit($value) { [Console]::WriteLine(($value | ConvertTo-Json -Compress -Depth 5)); [Console]::Out.Flush() }
try {
  Add-Type -AssemblyName System.Speech
  $available = @([System.Speech.Recognition.SpeechRecognitionEngine]::InstalledRecognizers())
  $chosen = $available | Where-Object { $_.Culture.Name.StartsWith('es-') } | Select-Object -First 1
  if (-not $chosen) {
    Emit @{ kind='error'; message='No hay un reconocedor de voz en espanol instalado. En Configuracion de Windows, instala las funciones de Voz del idioma Espanol. Puedes escribir los comandos mientras tanto.' }
    exit 2
  }
  $engine = [System.Speech.Recognition.SpeechRecognitionEngine]::new($chosen)
  $grammar = [System.Speech.Recognition.DictationGrammar]::new()
  $engine.LoadGrammar($grammar)
  $engine.SetInputToDefaultAudioDevice()
  $engine.InitialSilenceTimeout = [TimeSpan]::FromSeconds(8)
  $engine.BabbleTimeout = [TimeSpan]::FromSeconds(6)
  $engine.EndSilenceTimeout = [TimeSpan]::FromMilliseconds(700)
  Emit @{ kind='ready'; culture=$chosen.Culture.Name }
  while ($true) {
    $result = $engine.Recognize([TimeSpan]::FromSeconds(15))
    if ($null -ne $result) { Emit @{ kind='recognized'; text=$result.Text; confidence=[double]$result.Confidence } }
  }
} catch {
  Emit @{ kind='error'; message=('No pude iniciar el microfono o el reconocimiento de Windows. Revisa el permiso de microfono para aplicaciones de escritorio y el idioma de Voz. Detalle: ' + $_.Exception.Message) }
  exit 1
} finally { if ($null -ne $engine) { $engine.Dispose() } }
