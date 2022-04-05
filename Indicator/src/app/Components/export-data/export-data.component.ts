import { Component, OnInit,ViewChild, ElementRef } from '@angular/core';
import { jsPDF} from 'jspdf';  
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-export-data',
  templateUrl: './export-data.component.html',
  styleUrls: ['./export-data.component.scss']
})
export class ExportDataComponent implements OnInit {
  donnee = 'bonour';
  show = false;
  Data = [  
    { Id: 101, Name: 'Nitin', Salary: 1234 },  
    { Id: 102, Name: 'Sonu', Salary: 1234 },  
    { Id: 103, Name: 'Mohit', Salary: 1234 },  
    { Id: 104, Name: 'Rahul', Salary: 1234 },  
    { Id: 105, Name: 'Kunal', Salary: 1234 }  
  ];  

  @ViewChild('content') content: ElementRef; 
  constructor() { }

  ngOnInit(): void {
  }

  public SavePDF():void{  
    var Content = document.getElementById('content');
    
    html2canvas(Content).then((canvas) => {
      console.log(canvas);
      
      var imgData = canvas.toDataURL('image/png')
      let doc = new jsPDF('p','mm','a4');  
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;

      doc.addImage(imgData, 'png', 40, 40, 250, fileHeight);
      doc.save('test.pdf');  
      
    })

    

   
    // let _elementHandlers =  
    // {  
    //   '#editor':function(element,renderer){  
    //     return true;  
    //   } 
    
    
     
  }
  onSHOW(){
    this.show = true;
    console.log(this.show)
  }
  }  
 
 
