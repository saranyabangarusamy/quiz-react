import filter from 'lodash/filter';
import {
GraphQLInt,
        GraphQLBoolean,
        GraphQLString,
        GraphQLList,
        GraphQLObjectType,
        GraphQLInputObjectType,
        GraphQLNonNull,
        GraphQLSchema,
} from 'graphql';

const sqlite3 = require('sqlite3').verbose()

const database = new sqlite3.Database('./test.db', sqlite3.OPEN_READWRITE);

const UserType = new GraphQLObjectType({
    name: 'User',
    description: 'Users',
    fields: () => ({
            id: {type: new GraphQLNonNull(GraphQLInt)},
            userName: {type: new GraphQLNonNull(GraphQLString)},
            password: {type: new GraphQLNonNull(GraphQLString)},
            role  : {type: new GraphQLNonNull(GraphQLString)} ,
            email: {type: new GraphQLNonNull(GraphQLString)},
            contactno  : {type: new GraphQLNonNull(GraphQLString)} ,
            attempted: {type: new GraphQLNonNull(GraphQLInt)},
            score: {type: new GraphQLNonNull(GraphQLInt)}
        })
});

const QuestionType = new GraphQLObjectType({
    name: 'Question',
    description: 'Question',
    fields: () => ({
            id: {type: new GraphQLNonNull(GraphQLInt)},
            question: {type: new GraphQLNonNull(GraphQLString)}    ,
            options:{
                type:new GraphQLList(OptionType),
                resolve: (parent) => {                    
                    return new Promise((resolve, reject) => {                        
                        database.all("SELECT * FROM Options where qid = (?)",[parent.id], function(err, rows) {                             
                            console.log(parent.id)
                            console.log(rows)
                            if(err){
                                reject([]);
                            }                             
                            resolve(rows);
                        });
                    });                                    
                }
            }                  
        })
});

const OptionType = new GraphQLObjectType({
    name: 'Option',
    description: 'Option',
    fields: () => ({
            id: {type: new GraphQLNonNull(GraphQLInt)},
            qid: {type: new GraphQLNonNull(GraphQLInt)} ,
            option: {type: new GraphQLNonNull(GraphQLString)} ,
            is_right: {type: new GraphQLNonNull(GraphQLInt)} ,
        })
});

const FMQueryRootType = new GraphQLObjectType({
    name: 'FMAppSchema',
    description: 'Root FM App Schema',
    fields: () => ({
        user: {
            args: {
                userName: {type: GraphQLString},
                password: {type: GraphQLString}                  
            },
            type: UserType,
            description: 'User Info',
            resolve: (parent, {userName, password}, context, info) => {                
                return new Promise((resolve, reject) => {
                
                    database.all("SELECT * FROM USERS WHERE username = (?) and password = (?);",[userName, password], function(err, rows) {                                                   
                        if(err){                            
                            reject(err);
                        }
                        if(rows.length === 0)
                            reject("Please Enter Valid Credentials!")
                        resolve(rows[0]);
                    });
                });                                 
            }
        },
            users: {
                args: {
                    test: {type: GraphQLString}                    
                },
                type: new GraphQLList(UserType),
                description: 'List of Users',
                resolve: (parent, args) => {                    
                    return new Promise((resolve, reject) => {                        
                        database.all("SELECT * FROM USERS;", function(err, rows) {                             
                            if(err){
                                reject([]);
                            }
                            // if (Object.keys(args).length) {
                            //     return filter(resolve(rows), args);
                            // }   
                            resolve(rows);
                        });
                    });                                    
                }
            },
            questions: {
                args: {
                    test: {type: GraphQLString}                    
                },
                type: new GraphQLList(QuestionType),
                description: 'List of Questions',
                resolve: (parent, args) => {                    
                    return new Promise((resolve, reject) => {                        
                        database.all("SELECT * FROM Questions", function(err, rows) {                                                         
                            if(err){
                                reject([]);
                            }                             
                            resolve(rows);
                        });
                    });                                    
                }
            },
            options: {
                args: {
                    test: {type: GraphQLString}                    
                },
                type: new GraphQLList(OptionType),
                description: 'List of Options',
                resolve: (parent, args) => {                    
                    return new Promise((resolve, reject) => {                        
                        database.all("SELECT * FROM Options;", function(err, rows) {                             
                            if(err){
                                reject([]);
                            }                             
                            resolve(rows);
                        });
                    });                                    
                }
            }
        })
});

const UserCreateType = new GraphQLInputObjectType({
    name: 'UserCreateType',
    description: 'Add a user to the list',
    type: UserType,
    fields: {
            userName: {type: new GraphQLNonNull(GraphQLString)},
            password: {type: new GraphQLNonNull(GraphQLString)},
            email: {type: new GraphQLNonNull(GraphQLString)},
            contactno  : {type: new GraphQLNonNull(GraphQLString)}           
    }
});

const QuestionCreateType = new GraphQLInputObjectType({
    name: 'QuestionCreateType',
    description: 'Add a Question to the list',
    type: UserType,
    fields: {
            question: {type: new GraphQLNonNull(GraphQLString)}            ,
            option1: {type: new GraphQLNonNull(GraphQLString)}            ,
            option2: {type: new GraphQLNonNull(GraphQLString)}            ,
            option3: {type: new GraphQLNonNull(GraphQLString)}            ,
            option4: {type: new GraphQLNonNull(GraphQLString)}            
    }
});

const UserScoreType = new GraphQLInputObjectType({
    name: 'UserScoreType',
    description: 'Add a user to the list',
    type: UserType,
    fields: {
            id: {type: new GraphQLNonNull(GraphQLInt)},
            score: {type: new GraphQLNonNull(GraphQLInt)}                     
    }
});

const UserMutationType = new GraphQLObjectType({
    name: 'UserMutationType',
    description: 'Mutations for UserType',
    fields: {
        addUser: {
            type: new GraphQLList(UserType),
            args: {
                input: { type: new GraphQLNonNull(UserCreateType) }
            },
            resolve: (source, { input }) => {    
                return new Promise((resolve, reject) => {  
                    database.run('INSERT INTO USERS (userName, password,role,email,contactno,score,attempted) VALUES (?,?,?,?,?,?,?);', [input.userName, input.password,'user',input.email,input.contactno,0,0], (err) => {                        
                        if(err) {
                            if(err.errno === 19)
                                reject("User already exists");
                            else
                                reject("Error")
                        }
                        database.all("SELECT * FROM USERS;", function(err, rows) {  
                            if(err){
                                reject([]);
                            }                             
                            resolve(rows);
                        });
                    });
                });                
            }
        },
        addQuestion: {
            type: new GraphQLList(QuestionType),
            args: {
                input: { type: new GraphQLNonNull(QuestionCreateType) }
            },
            resolve: (source, { input }) => {    
                return new Promise((resolve, reject) => {  
                    database.run('INSERT INTO Questions (question) VALUES (?)', [input.question], (err, rows) => {                        
                        console.log(rows);
                        if(err) {
                                reject(er)
                        }
                        else{

                        }                        
                    });
                });                
            }
        },
        updateScore: {
            type: new GraphQLList(UserType),
            args: {
                input: { type: new GraphQLNonNull(UserScoreType) }
            },
            resolve: (source, { input }) => {                   
                return new Promise((resolve, reject) => {  
                    database.run('UPDATE USERS SET score = (?), attempted = (?) WHERE id = (?);', [input.score, 1, input.id], (err) => {                        
                        if(err) {                            
                                reject(err)
                        }
                        database.all("SELECT * FROM USERS;", function(err, rows) {  
                            if(err){
                                reject([]);
                            }                             
                            resolve(rows);
                        });
                    });
                });                
            }
        },
        deleteUser: {
            type: new GraphQLList(UserType),
            args: {
                id: {type: GraphQLInt}
            },
            resolve: (source, { id }) => {

                return new Promise((resolve, reject) => {  
                    database.run('DELETE from USERS WHERE id =(?);', [id], (err) => {
                        if(err) {
                            reject(null);
                        }
                        database.all("SELECT * FROM USERS;", function(err, rows) {  
                            if(err){
                                reject([]);
                            }                             
                            resolve(rows);
                        });
                    });
                });               
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: FMQueryRootType  ,
    mutation: UserMutationType  
});

export default schema;
