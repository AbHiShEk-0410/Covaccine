const puppy = require("puppeteer");
const nodemailer = require('nodemailer');


const account = {

    user : "skye.dickens@ethereal.email", //email 
    pass : "J65ZW2phkM9Fxpe2TE" //password

};
async function main(){

    let browser = await puppy.launch({
        headless:  false,
        defaultViewport: false,
        args: ["--start-maximized"]
    });


    let tabs = await browser.pages();
    tab = tabs[0];


    await tab.goto("https://www.cowin.gov.in/home",{waitUntil:"networkidle2"});
    let pin = "110001";
    await tab.type("input[placeholder='Enter your PIN']",pin,);
    await tab.keyboard.press("Enter");

    const options = {
        path: 'scrnsht.jpg',
        fullPage: true,
        omitBackground: true
    };


    await tab.screenshot(options,{waitUntil:"networkidle2"});
    browser.close();
    

    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, 
      auth: {
        user: account.user, // generated ethereal user
        pass: account.pass, // generated ethereal password
      },
    });
  
    let info = await transporter.sendMail({
      from: '"Fred Foo 👻" <foo@example.com>', // sender address
      to: "bar@example.com, baz@example.com", // list of receivers
      subject: "Vaccination Centres", 
      text: "Covid Vaccine", 
      html: '<b>Centres Near Me?</b><br/> <img src="cid:scrnsht"/>', 
      attachments: [
        {
          filename: 'scrnsht.jpg',
          path: __dirname+'/scrnsht.jpg',
          cid : 'scrnsht'
        },
      ]
    });
  
    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  
    
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    
}

main().catch(console.error);