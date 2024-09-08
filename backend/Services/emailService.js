// import Imap from 'imap';
// import { inspect } from 'util';

// // Function to fetch emails
// const fetchEmails = () => {
//   const imap = new Imap({
//     user: process.env.EMAIL_USER,
//     password: process.env.EMAIL_PASSWORD,
//     host: process.env.EMAIL_HOST,
//     port: 993,
//     tls: true
//   });

//   imap.connect();

//   imap.once('ready', function() {
//     imap.openBox('INBOX', true, function(err, box) {
//       if (err) throw err;
//       imap.search(['UNSEEN', ['SINCE', 'May 20, 2024']], function(err, results) {
//         if (err) throw err;
//         const f = imap.fetch(results, { bodies: '' });
//         f.on('message', function(msg, seqno) {
//           console.log('Message #%d', seqno);
//           msg.on('body', function(stream, info) {
//             let buffer = '';
//             stream.on('data', function(chunk) {
//               buffer += chunk.toString('utf8');
//             });
//             stream.once('end', function() {
//               console.log(inspect(Imap.parseHeader(buffer)));
//             });
//           });
//         });
//         f.once('error', function(err) {
//           console.log('Fetch error: ' + err);
//         });
//         f.once('end', function() {
//           console.log('Done fetching all messages!');
//           imap.end();
//         });
//       });
//     });
//   });

//   imap.once('error', function(err) {
//     console.log(err);
//   });

//   imap.once('end', function() {
//     console.log('Connection ended');
//   });
// };

// export default fetchEmails;
