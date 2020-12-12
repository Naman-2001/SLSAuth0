import AWS from "aws-sdk";

const ses = new AWS.SES({ region: "ap-south-1" });

async function sendMail(event, context) {
  const record = event.Records[0];
  console.log(event);
  console.log("record processing", record);

  const email = JSON.parse(record.body);
  const { subject, body, recipient } = email;

  const params = {
    Source: "naman.aggarwal2001@gmail.com",
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
    const result = await ses.sendEmail(params).promise();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
}

export const handler = sendMail;
