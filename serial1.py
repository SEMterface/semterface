import serial
import sys
from PyQt4.QtCore import *
from PyQt4.QtGui import *


class MainWindow(QMainWindow):
    def __init__(self,parent=None):
        super(MainWindow,self).__init__(parent)
        self.ser = serial.Serial(2,9600)
        self.setWindowTitle("SEM Control")
        #set up widgets
        self.frames()        

    def right(self):
        self.ser.write(b'd')
    def left(self):
        self.ser.write(b'a')
    def up(self):
        self.ser.write(b'w')
    def down(self):
        self.ser.write(b's')
    def frames(self):    
          
        buttonLeft = QPushButton("Left")
        self.connect(buttonLeft, SIGNAL("clicked()"), self.left)
        buttonRight = QPushButton("Right")
        self.connect(buttonRight, SIGNAL("clicked()"), self.right)
        buttonUp = QPushButton("Up")
        self.connect(buttonUp, SIGNAL("clicked()"), self.up)
        buttonDown = QPushButton("Down")
        self.connect(buttonDown, SIGNAL("clicked()"), self.down)
        
        grid = QGridLayout()
        
        grid.addWidget(buttonLeft,1,0)
        grid.addWidget(buttonRight,1,2)
        grid.addWidget(buttonUp,0,1)
        grid.addWidget(buttonDown,2,1)         

        
        self.window = QWidget()  
        self.window.setLayout(grid)
        
        #add window 
        self.setCentralWidget(self.window)
    def closeEvent(self, event):
        self.ser.close()
        event.accept()
app= QApplication(sys.argv)
form = MainWindow()
form.show()
app.exec_()
