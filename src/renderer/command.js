const command = require('node-cmd');


export default {
    runShell(shell,callback){
        command.get(shell,callback);
    }
};

// comman.get(
//     'pwd',
//     function(err, data, stderr){
//         console.log('the current working dir is : ',data)
//     }
// );
//
// comman.run('touch example.created.file');
//
// comman.get(
//     'ls',
//     function(err, data, stderr){
//         console.log('the current dir contains these files :\n\n',data)
//     }
// );
//
// comman.get(
//     `
//             git clone https://github.com/RIAEvangelist/node-cmd.git
//             cd node-cmd
//             ls
//         `,
//     function(err, data, stderr){
//         if (!err) {
//             console.log('the node-cmd cloned dir contains these files :\n\n',data)
//         } else {
//             console.log('error', err)
//         }
//
//     }
// );