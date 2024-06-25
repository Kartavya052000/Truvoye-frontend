import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const SubmitOrder = ({ initialData, handleOrderSubmission }) => {
  // Define Yup validation schema
  const validationSchema = Yup.object().shape({
    pickupDate: Yup.date().required('Pickup Date is required'),
    sendersName: Yup.string().required('Sender\'s Name is required'),
    sendersEmail: Yup.string().email('Invalid email').required('Sender\'s Email is required'),
    receiversName: Yup.string().required('Receiver\'s Name is required'),
    receiversEmail: Yup.string().email('Invalid email').required('Receiver\'s Email is required'),
  });

  // Handle form submission with Formik
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const data = {
        pickup_date: values.pickupDate,
        pickup_address: initialData.pickupAddress,
        receiver_address: initialData.receiverAddress,
        weight: initialData.weight,
        senders_name: values.sendersName,
        senders_email: values.sendersEmail,
        receivers_name: values.receiversName,
        receivers_email: values.receiversEmail,
      };

      const response = await axios.post('http://localhost:4000/api/orderDetails/SubmitOrder', data);

      if (!response.data) {
        throw new Error('Failed to submit order');
      }

      handleOrderSubmission(response.data);
    } catch (error) {
      console.error('Error submitting order:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        pickupDate: '',
        sendersName: '',
        sendersEmail: '',
        receiversName: '',
        receiversEmail: '',
      }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label htmlFor="pickupDate">Pickup Date</label>
            <Field type="date" id="pickupDate" name="pickupDate" />
            <ErrorMessage name="pickupDate" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="sendersName">Sender's Name</label>
            <Field type="text" id="sendersName" name="sendersName" />
            <ErrorMessage name="sendersName" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="sendersEmail">Sender's Email</label>
            <Field type="email" id="sendersEmail" name="sendersEmail" />
            <ErrorMessage name="sendersEmail" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="receiversName">Receiver's Name</label>
            <Field type="text" id="receiversName" name="receiversName" />
            <ErrorMessage name="receiversName" component="div" className="error" />
          </div>

          <div>
            <label htmlFor="receiversEmail">Receiver's Email</label>
            <Field type="email" id="receiversEmail" name="receiversEmail" />
            <ErrorMessage name="receiversEmail" component="div" className="error" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Order'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SubmitOrder;