import AWS from "aws-sdk";

const ses = new AWS.SES({ region: "us-east-1" });

async function sendMail(event, context) {
  const params = {
    Source: "md@furkanul.com",
    Destination: {
      ToAddresses: ["md@furkanul.com"],
    },
    Message: {
      Body: {
        Text: {
          Data: "Hello from Worlflow Pluse!",
        },
      },
      Subject: {
        Data: "Hi there, Here is your account details.",
      },
    },
  };

  try {
    const result = await ses.sendEmail(params).promise();
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const handler = sendMail;
