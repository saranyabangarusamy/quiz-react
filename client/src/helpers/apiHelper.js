/**
 * 
 * Service for calling GraphQL API server
 */
class apiHelper {
   
    constructor() {
        this.apiUrl = 'http://localhost:3005/graphql';        
    }
    
    async login(user) {           
        const res = await fetch(this.apiUrl, {
            method: 'POST',            
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({
                query: `query { user(userName : "${user.userName}", password : "${user.password}") {id userName role } }`,
              }),   
        });
        
        if (res.ok) {
            const body = await res.json();             
            if(body.errors === undefined)       
                return body.data;
            else
            {
                return {errorMessage:body.errors[0].message};                    
            }
        } else {
            throw new Error(res.status);
        }
    } 

    async deleteUser(user) {     
        console.log(user);
        const res = await fetch(this.apiUrl, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({
                query:`mutation {
                    deleteUser(id : ${user.id}) {
                        id userName email contactno score                   
                    }
                  }`
            }),
        });
        console.log(res)
        if (res.ok) {
            console.log("in")
            const body = await res.json();          
            return body.data.deleteUser;
        } else {
            console.log("err")
            throw new Error(res.status);
        }
    }

    async addUser(user) {       
        const res = await fetch(this.apiUrl, {
            method: 'POST',            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({
                query:`mutation {
                    addUser(input : { userName: "${user.userName}", password: "${user.password}", email: "${user.email}",contactno: "${user.contactno}" } ) {
                        id
                        userName
                        email
                    }
                  }`
            }),
        });
        
        if (res.ok) {
            const body = await res.json();              
            if(body.errors === undefined)       
            {
                alert("Signedup successfully..")
                return body.data.addUser;
            }
            else
            {
                return {errorMessage:body.errors[0].message};                    
            }
        } else {
            throw new Error(res.status);
        }
    } 
    
    async addQuestion(question) {       
        const res = await fetch(this.apiUrl, {
            method: 'POST',            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({
                query:`mutation {
                    addQuestion(input : { question: "${question.question}", option1: "${question.option1}", option2: "${question.option2}",option3: "${question.option3}",option4: "${question.option}" } ) {
                        id
                    }
                  }`
            }),
        });
        
        if (res.ok) {
            const body = await res.json();              
            if(body.errors === undefined)       
            {
                alert("Signedup successfully..")
                return body.data.addUser;
            }
            else
            {
                return {errorMessage:body.errors[0].message};                    
            }
        } else {
            throw new Error(res.status);
        }
    } 


    async updateScore(user,score) {              
        const res = await fetch(this.apiUrl, {
            method: 'POST',            
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({
                query:`mutation {
                    updateScore(input : { id: ${user.id}, score: ${score} } ) {
                        id
                        userName                        
                    }
                  }`
            }),
        });
        
        if (res.ok) {
            const body = await res.json();   
            console.log(body)
            if(body.errors === undefined)       
                return body.data.updateScore;
            else
            {
                return {errorMessage:body.errors[0].message};                    
            }
        } else {
            throw new Error(res.status);
        }
    } 

    async getGraphQlData(resource, params, fields) {
      
        const res = await fetch(this.apiUrl, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({
                query: `query { users { id userName email contactno score } }`,
              }),            
        });
        
        if (res.ok) {            
            const body = await res.json();            
            return body.data;
        } else {
            throw new Error(res.status);
        }
    }  
    
    async getQuestions(resource, params, fields) {
      
        const res = await fetch(this.apiUrl, {
            method: 'POST',
            mode: 'cors',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            }),
            body: JSON.stringify({
                query: `query { 
                    questions { 
                        id 
                        question 
                        options{
                            id
                            qid
                            option
                            is_right
                        }
                    } }`,
              }),            
        });
        
        if (res.ok) {            
            const body = await res.json();            
            return body.data;
        } else {
            throw new Error(res.status);
        }
    }   

}

export default new apiHelper();
