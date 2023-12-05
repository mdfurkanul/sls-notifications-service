import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const client = new SESClient({ region: "us-east-1" });

async function sendMail(event, context) {
  const params = {
    Source: "md@furkanul.com",
    Destination: {
      ToAddresses: ["md@furkanul.com"],
    },
    Message: {
      Body: {
        Text: {
          Data: "Hello from Codingly!",
        },
      },
      Subject: {
        Data: "Test Mail",
      },
    },
  };

  try {
    const command = new SendEmailCommand(params);
    const result = await client.send(command);
    console.log(result);
    return result;
  } catch (error) {
    console.error(error);
  }
}

export const handler = sendMail;
