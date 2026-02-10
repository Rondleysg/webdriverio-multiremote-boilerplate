$env:ANDROID_HOME="$env:LOCALAPPDATA\Android\Sdk"

emulator -avd Android_Test `
  -no-window `
  -no-audio `
  -gpu swiftshader_indirect `
  -no-boot-anim
