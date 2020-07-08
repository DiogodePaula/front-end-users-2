const axios = require('axios').default;

class User {
    constructor(){
        this.name = document.getElementById('txtName');
        this.email = document.getElementById('txtEmail');
        this.age = document.getElementById('txtAge');
        this.phone = document.getElementById('txtPhone');
        this.btnRegisterUser = document.getElementById('btnRegister');
        this.events();
        this.getUsers();
    }

    events(){
        
        this.btnRegisterUser.onclick = (event) => this.createUser(event);
    }

    getUsers(){
        axios.get(`http://localhost:3000/users`)
        .then((response) => {
            this.recoveryUser(response.data.usersList);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    recoveryUser(data){
        console.log(data);
        for (user of data) {

            const html = this.layoutUser(user.name, user.email, user.age, user.phone)

            document.getElementById('usersBoard').innerHTML += html;
        }
    }
    
    layoutUser(name, email, age, phone){
        
        // const html =
        return `
            <div class='col mt-5'>
                <div class='user'>
                    <div class='user-body'>
                        <h3 class='user-name'>${name}</h3>
                        <p class='user-email'>${email}</p>
                        <p class='user-age'>${age}</p>
                        <p class='user-phone'>${phone}</p>  
                    </div>
                </div>
            </div>     
            `;

            // return html;
    }

    userValidate(event){
        event.preventDefault();
        if (this.name.value && this.email.value && this.age.value && this.phone.value){
            const user = {
                name: this.name.value,
                email: this.email.value,
                age: this.age.value,
                phone: this.phone.value
            } 

            this.createUser(user);

        } else {
            alert('favor, preencha todos os dados');
        }

    createUser(user){
            axios.post(`http://localhost:3000/users`, user)
            .then((response) =>{
                console.log(response);
                //location.reload(); não é bom pois recarregaria todos os dados
                const html = this.layoutUser(user.name, user.email, user.age, user.phone);

                document.getElementById('usersBoard').innerHTML += html;
            })
            .catch((err) =>{
                console.log(err);
            })
        }
    }      
}

new User();