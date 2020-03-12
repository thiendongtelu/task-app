const mongoose = require('mongoose'); 

mongoose.connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});



// const me = new User({
//     name: "Andrew",
//     email:"thiendongte@SpeechGrammarList.com",
//     password:"thiendongtelu28092011",
//     age: 27
// });

// me.save().then(() => {
//     console.log(me);
// }).catch((error) => {
//     console.log(error);
// })



// const finishLessonEighth = new Task({
//     name: "Finish lesson 8th",
//     completed: false
// });

// finishLessonEighth.save().then(result => console.log(result)).catch(error => console.log(error));