module.exports = {
  processor,
  concurrency: 1
}

async function processor(job) {

  // UPDATE THE PATH
  const PROTO_PATH = __dirname + '/proto/linkDiscoverer.proto';

  const grpc = require('@grpc/grpc-js');
  const protoLoader = require('@grpc/proto-loader');
  
  let packageDefinition = protoLoader.loadSync(
      PROTO_PATH,
      {keepCase: true,
       longs: String,
       enums: String,
       defaults: true,
       oneofs: true
      });
  let employee_proto = grpc.loadPackageDefinition(packageDefinition).linkDiscoverer;
  
  function main() {
    let client = new employee_proto.LinkDiscoverer('localhost:4500',
                                         grpc.credentials.createInsecure());
                                         
    // let employeeIdList = [1,10,2];
    // let call = client.paySalary({employeeIdList: employeeIdList});
    let call = client.discoverLinks({ url: 'https://solaire8250.com/' })
  
    call.on('data',function(response){
      console.log({ response });
    });
  
    call.on('end',function(){
      console.log('Done');
    });
  
  }
  
  main();
}
