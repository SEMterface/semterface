const int outputPin = 13;
bool ledState = false;
int x = 0;

void setup()
{
  pinMode(outputPin, OUTPUT);
  Serial.begin(9600);
}

void loop()
{
  if (Serial.available() > 0) {
    int incomingByte = Serial.read();

    Serial.print(incomingByte);

    x = 0;
    switch (incomingByte) {
      case 119: //up:w
        blink();
        break;
      case 115: // down:s
        while(x < 3) {
          blink(); //blink 3 times
          x++;
        }
        break;
      case 100: // right:d
        while(x < 4) {
          blink(); //blink 4 times
          x++;
        }
        break;
      case 97: //left:a
        while(x < 2) {
          blink(); //blink 2 times
          x++;
        }
        break;
    }
  }
}

void blink()
{
  ledState = !ledState;
  digitalWrite(outputPin, ledState);
  delay(100);
  ledState = !ledState;
  digitalWrite(outputPin, ledState);
  delay(100);
}

