$ErrorActionPreference = 'Stop'
[Console]::OutputEncoding = [System.Text.UTF8Encoding]::new($false)
try {
  Add-Type -AssemblyName System.Speech
  $request = [Console]::In.ReadToEnd() | ConvertFrom-Json
  $synth = [System.Speech.Synthesis.SpeechSynthesizer]::new()
  $spanish = $synth.GetInstalledVoices() | Where-Object { $_.Enabled -and $_.VoiceInfo.Culture.Name.StartsWith('es-') } | Select-Object -First 1
  if ($spanish) { $synth.SelectVoice($spanish.VoiceInfo.Name) }
  $synth.SetOutputToDefaultAudioDevice()
  $synth.Speak([string]$request.text)
} catch { [Console]::Error.WriteLine($_.Exception.Message); exit 1 }
finally { if ($null -ne $synth) { $synth.Dispose() } }
