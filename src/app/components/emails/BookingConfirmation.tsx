/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import {
  Html,
  Body,
  Container,
  Text,
  Link,
  Preview,
  Heading,
  Img,
} from '@react-email/components';

interface BookingConfirmationEmailProps {
  customerName: string;
  bookingId: number;
  serviceType: string;
  serviceDate: string;
  amount: number;
}

export const BookingConfirmationEmail = ({
  customerName,
  bookingId,
  serviceType,
  serviceDate,
  amount,
}: BookingConfirmationEmailProps) => {
  const main = {
    backgroundColor: '#f6f9fc',
    fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
  };

  const container = {
    backgroundColor: '#ffffff',
    margin: '0 auto',
    padding: '20px 0 48px',
    marginBottom: '64px',
  };

  const logo = {
    margin: '0 auto',
    marginBottom: '20px',
    width: '150px', // Adjust size as needed
    height: 'auto',
  };

  const header = {
    fontSize: '24px',
    letterSpacing: '-0.5px',
    lineHeight: '1.3',
    fontWeight: '400',
    color: '#484848',
    padding: '17px 0 0',
  };

  const paragraph = {
    margin: '0 0 15px',
    fontSize: '15px',
    lineHeight: '1.4',
    color: '#3c4149',
  };

  const detailsContainer = {
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '4px',
    margin: '20px 0',
  };

  const detailItem = {
    margin: '8px 0',
    fontSize: '14px',
    color: '#3c4149',
  };

  return (
    <Html>
      <Preview>Your booking confirmation from Service Provider</Preview>
      <Body style={main}>
        <Container style={container}>
          <Img
            src={`https://utfs.io/f/GlyqdSNLiFzq0WJjATgEqkXQB9Vci7sY0ZwoC8f1nSUH5Waj`}
            width="150"
            height="auto"
            alt="Company Logo"
            style={logo}
          />
          <Heading style={header}>Booking Confirmation</Heading>
          <Text style={paragraph}>Dear {customerName},</Text>
          <Text style={paragraph}>
            Thank you for your booking. Here are your booking details:
          </Text>
          
          <div style={detailsContainer}>
            <Text style={detailItem}>
              <strong>Booking ID:</strong> #{bookingId}
            </Text>
            <Text style={detailItem}>
              <strong>Service:</strong> {serviceType}
            </Text>
            <Text style={detailItem}>
              <strong>Date:</strong> {new Date(serviceDate).toLocaleString()}
            </Text>
            <Text style={detailItem}>
              <strong>Amount:</strong> ₱{amount}
            </Text>
          </div>

          <Text style={paragraph}>
            You can view your booking details and status anytime by logging into your account.
          </Text>
          
          <Text style={paragraph}>
            If you have any questions, please dont hesitate to contact us.
          </Text>

          <Text style={paragraph}>Best regards,<br />Your Service Provider Team</Text>
        </Container>
      </Body>
    </Html>
  );
};

export default BookingConfirmationEmail;