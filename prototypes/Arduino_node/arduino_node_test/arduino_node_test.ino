const int outputPin = 13;

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

    if (incomingByte == 49) {
      digitalWrite(outputPin, HIGH);
    } 
    else if (incomingByte == 48) {
      digitalWrite(outputPin, LOW);
    }
  }
}

