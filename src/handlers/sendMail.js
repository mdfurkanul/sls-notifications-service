import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const client = new SESClient({ region: "us-east-1" });

async function sendMail(event, context) {
  const record = event.Records[0];
  console.log("SQS record: ", record);

  const email_json = JSON.parse(record.body);
  const { subject, body, recipient } = email_json;
  const params = {
    Source: "md@furkanul.com",
    Destination: {
      ToAddresses: [recipient],
    },
    Message: {
      Body: {
        Text: {
          Data: body,
        },
      },
      Subject: {
        Data: subject,
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
