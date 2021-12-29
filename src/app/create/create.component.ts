import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpcallService } from '../httpcall.service';
import { Users } from '../users';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  userlist : any;//must declare as any
  uid:string;
  suser:any = {};
  created = false;
  newuser: Users;
  upduser: Users;
  patchuser:Users;
  delmsg:string;

  constructor(private htcall:HttpcallService,
    private actroute:ActivatedRoute ) { }

    

  ngOnInit(): void {
    

    this.actroute.params.subscribe(data =>{//tocapture the id passed in the browser
      this.uid = data['id'];//id captured here can be used to view / update / delete contact or for anything else
    });
    
    this.htcall.getuser(this.uid).subscribe(udata =>{
      this.suser = udata;//returned suser is a object type having property data which contain our userdetails
      console.log(this.suser);
    });

    this.view();

    //creating an object user of class Users
    /*var user = new  Users();//Users have to be set toa class rather than interface
    user.first_name = 'Vivek';
    user.last_name = 'Kumar';
    user.email = 'viv@efr';
    user.avatar = 'Spiderman';

    

    this.htcall.post(user).subscribe(pdata =>{
      this.newuser = pdata;
    }) */

    //put method
    var user = new Users();
    user.first_name = 'Mahesh';
    user.last_name = 'Jack';
    user.email = 'mah@789';
    user.avatar = '...';

    this.htcall.put(user).subscribe(pudata =>{
      this.upduser = pudata;
    })

    //patchmethod
     user = new Users();
    user.avatar = 'Iron Man';

    this.htcall.patch(user).subscribe(padata =>{
      this.patchuser= padata;
    });

    //deletemethod
    this.htcall.delete().subscribe(dedata =>{
      this.delmsg = "Deleted Successfully";
    })

  }

  view(){
    return this.htcall.getUsers().subscribe(data =>{
      this.userlist = data; //whole object is returned including all properties from page to data where data is 
      //our required array ;userlist is of object type
      console.log(this.userlist); 
    });
  }
  
   //create user
   adduser(form: { value: { fname: any; lname: any; email: any; ava: any; }; }){

    //let newuser= {
      var user = new Users();//defining an object user of class  Users
      user.first_name = form.value.fname,// value entered in the form assigned to proprties of object
      user.last_name = form.value.lname,
      user.email = form.value.email,
      user.avatar = form.value.ava,
    
    /*this.htcall.addUser(newuser).subscribe(data =>{
      console.log(data);
      this.created = true;
    }) */

    this.htcall.post(user).subscribe(pdata =>{//post method is called and user object is passed 
      this.newuser = pdata;//newly created object is returned to newuser of type Users
    })
  }

  

}
