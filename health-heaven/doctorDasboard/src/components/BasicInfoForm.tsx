import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import clsx from 'clsx';
import axios from 'axios';

const schema = z
  .object({
    fullName: z.string().min(3, 'Full name must be at least 3 characters'),
    email: z.string().email('Invalid email address'),
    phone: z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number'),
    password: z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

interface Props {
  onSubmit?: (data: any) => void; // Keep optional for external handling
  defaultValues?: Partial<any>;
  isActive: boolean;
}

export function BasicInfoForm({ onSubmit, defaultValues, isActive }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const handleFormSubmit = async (data: any) => {
    try {
      // Example API endpoint
      const response = await axios.post('localhost:5000/api/doctor/register-doctor', data);
      alert('Data submitted successfully!');
      reset(); // Clear the form after submission

      if (onSubmit) onSubmit(data);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to submit data. Please try again.');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit(handleFormSubmit)} 
      className={clsx(
        'space-y-6 transition-opacity duration-300 bg-white p-6 rounded-lg shadow-lg',
        !isActive && 'opacity-50'
      )}
    >
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-900">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          {...register('fullName')}
          disabled={!isActive}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
        />
        {errors.fullName && <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>}
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-900">
          Email
        </label>
        <input
          type="email"
          id="email"
          {...register('email')}
          disabled={!isActive}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
        />
        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          {...register('phone')}
          disabled={!isActive}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
        />
        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-900">
          Password
        </label>
        <input
          type="password"
          id="password"
          {...register('password')}
          disabled={!isActive}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
        />
        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-900">
          Confirm Password
        </label>
        <input
          type="password"
          id="confirmPassword"
          {...register('confirmPassword')}
          disabled={!isActive}
          className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 p-2"
        />
        {errors.confirmPassword && <p className="mt-1 text-sm text-red-500">{errors.confirmPassword.message}</p>}
      </div>

      {isActive && (
        <button
          type="submit"
          className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        >
          Next
        </button>
      )}
    </form>
  );
}
