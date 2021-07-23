const Task = require('data.task');

const launchMissiles = () => 
    new Task((rej, res) => {
        console.log('launch missiles');
        res('missile');
    });

// launchMissiles()
// .map(x => x + '!')
// .fork(e => console.log('err', e),
// x => console.log('success', x));

const app = launchMissiles().map(x => x + '!');

app.map(x => x + '!').fork(e => console.log('err', e),
                            x => console.log('success', x));
    
// Task.of(1)
// .fork(e => console.log('err', e),
// x => console.log('success', x));

// Task.rejected(1)
// .map(x => x +1)
// .fork(e => console.log('err', e),
// x => console.log('success', x));

// Task.of(1)
// .map(x => x +1)
// .fork(e => console.log('err', e),
// x => console.log('success', x));