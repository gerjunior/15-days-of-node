import { match, doesNotMatch } from 'node:assert'

/** HackerHank test
 * function processData(input) {
    const ipv4Exp = /^(([01]\d{2}|2[0-5][0-5]|\d{1,2})\.){3}([01]\d{2}|2[0-5][0-5]|\d{1,2})$/
    const ipv6Exp = /^(([0-9]|[a-f]){0,4}:){0,7}([0-9]|[a-f]){0,4}$/
    
    const [n, ...ips] = input.split('\n')
    
    for (let i = 0; i < n; i++) {
        if (ipv4Exp.test(ips[i])) {
            console.log('IPv4')
            continue
        }
        
        if (ipv6Exp.test(ips[i])) {
            console.log('IPv6')
            continue
        }
        
        console.log('Neither')
    }
} 

process.stdin.resume();
process.stdin.setEncoding("ascii");
_input = "";
process.stdin.on("data", function (input) {
    _input += input;
});

process.stdin.on("end", function () {
   processData(_input);
});
 */

const ipv4Exp =
  /^(([01]\d{2}|2[0-5][0-5]|\d{1,2})\.){3}([01]\d{2}|2[0-5][0-5]|\d{1,2})$/

match('255.255.255.255', ipv4Exp)
match('0.0.0.0', ipv4Exp)
match('192.168.0.1', ipv4Exp)
match('1.123.212.1', ipv4Exp)

doesNotMatch('255.255.255.256', ipv4Exp)
doesNotMatch('1.0.0', ipv4Exp)
doesNotMatch('192.168.0', ipv4Exp)
doesNotMatch('192.168.0.', ipv4Exp)
doesNotMatch('192.168.0.0.', ipv4Exp)

const ipv6Exp = /^(([0-9]|[a-f]){0,4}:){2,7}([0-9]|[a-f]){0,4}$/i

match('2001:db8:3333:4444:5555:6666:7777:8888', ipv6Exp)
match('2001:db8:3333:4444:CCCC:DDDD:EEEE:FFFF', ipv6Exp)
match('2234:dbdb:aaaa:AAAA:CCCC:DDDD:E1EE:FFFa', ipv6Exp)
match('FACA:ABAF:A000:CADA:CACA:CADE:DADA:FADA', ipv6Exp)
match('2001:0db8:0001:0000:0000:0ab9:C0A8:0102', ipv6Exp)
match('2001:db8:1::ab9:C0A8:102', ipv6Exp)
match('::', ipv6Exp)
match(':::::::', ipv6Exp)

doesNotMatch('2001:db8:3333:4444:5555:6666:7777:g', ipv6Exp)
doesNotMatch('', ipv6Exp)
doesNotMatch(':', ipv6Exp)
doesNotMatch('::::::::', ipv6Exp)
doesNotMatch(':::::::1223:', ipv6Exp)
