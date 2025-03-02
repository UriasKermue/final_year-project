import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DoctorIdentification } from '../types/doctor';
import { Upload } from 'lucide-react';
import clsx from 'clsx';

const schema = z.object({
  governmentId: z.instanceof(FileList).refine((files) => files.length > 0, 'Government ID is required'),
  profilePicture: z.instanceof(FileList).refine((files) => files.length > 0, 'Profile picture is required'),
});

interface Props {
  onSubmit: (data: DoctorIdentification) => void;
  onBack: () => void;
  defaultValues?: Partial<DoctorIdentification>;
  isActive: boolean;
}

export function IdentificationForm({ onSubmit, onBack, defaultValues, isActive }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorIdentification>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  return (
    <form 
      onSubmit={handleSubmit(onSubmit)} 
      className={clsx(
        "space-y-6 transition-opacity duration-300",
        !isActive && "opacity-50"
      )}
    >
      <div>
        <label className="block text-sm font-medium text-gray-700">Government ID</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="governmentId"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>Upload a file</span>
                <input
                  id="governmentId"
                  type="file"
                  className="sr-only"
                  accept="image/*,.pdf"
                  disabled={!isActive}
                  {...register('governmentId')}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB</p>
          </div>
        </div>
        {errors.governmentId && (
          <p className="mt-1 text-sm text-red-600">{errors.governmentId.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="profilePicture"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>Upload a file</span>
                <input
                  id="profilePicture"
                  type="file"
                  className="sr-only"
                  accept="image/*"
                  disabled={!isActive}
                  {...register('profilePicture')}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
          </div>
        </div>
        {errors.profilePicture && (
          <p className="mt-1 text-sm text-red-600">{errors.profilePicture.message}</p>
        )}
      </div>

      {isActive && (
        <div className="flex gap-4">
          <button
            type="button"
            onClick={onBack}
            className="flex-1 py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Back
          </button>
          <button
            type="submit"
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Next
          </button>
        </div>
      )}
    </form>
  );
}