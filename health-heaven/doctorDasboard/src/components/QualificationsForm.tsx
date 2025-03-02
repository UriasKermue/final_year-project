import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { DoctorQualifications } from '../types/doctor';
import { Upload } from 'lucide-react';
import clsx from 'clsx';

const schema = z.object({
  licenseNumber: z.string().min(1, 'License number is required'),
  specialty: z.string().min(1, 'Specialty is required'),
  yearsOfExperience: z.number().min(0, 'Years of experience must be positive'),
  hospitalAffiliation: z.string().min(1, 'Hospital affiliation is required'),
  certifications: z.instanceof(FileList).refine((files) => files.length > 0, 'At least one certification is required'),
});

interface Props {
  onSubmit: (data: DoctorQualifications) => void;
  onBack: () => void;
  defaultValues?: Partial<DoctorQualifications>;
  isActive: boolean;
}

export function QualificationsForm({ onSubmit, onBack, defaultValues, isActive }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DoctorQualifications>({
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
        <label htmlFor="licenseNumber" className="block text-sm font-medium text-gray-700">
          Medical License Number
        </label>
        <input
          type="text"
          id="licenseNumber"
          {...register('licenseNumber')}
          disabled={!isActive}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.licenseNumber && (
          <p className="mt-1 text-sm text-red-600">{errors.licenseNumber.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="specialty" className="block text-sm font-medium text-gray-700">
          Specialty
        </label>
        <select
          id="specialty"
          {...register('specialty')}
          disabled={!isActive}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        >
          <option value="">Select a specialty</option>
          <option value="cardiology">Cardiology</option>
          <option value="dermatology">Dermatology</option>
          <option value="neurology">Neurology</option>
          <option value="pediatrics">Pediatrics</option>
          <option value="psychiatry">Psychiatry</option>
        </select>
        {errors.specialty && (
          <p className="mt-1 text-sm text-red-600">{errors.specialty.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="yearsOfExperience" className="block text-sm font-medium text-gray-700">
          Years of Experience
        </label>
        <input
          type="number"
          id="yearsOfExperience"
          {...register('yearsOfExperience', { valueAsNumber: true })}
          disabled={!isActive}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.yearsOfExperience && (
          <p className="mt-1 text-sm text-red-600">{errors.yearsOfExperience.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="hospitalAffiliation" className="block text-sm font-medium text-gray-700">
          Hospital Affiliation
        </label>
        <input
          type="text"
          id="hospitalAffiliation"
          {...register('hospitalAffiliation')}
          disabled={!isActive}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        {errors.hospitalAffiliation && (
          <p className="mt-1 text-sm text-red-600">{errors.hospitalAffiliation.message}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Certifications</label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label
                htmlFor="certifications"
                className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
              >
                <span>Upload files</span>
                <input
                  id="certifications"
                  type="file"
                  multiple
                  className="sr-only"
                  disabled={!isActive}
                  {...register('certifications')}
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PDF, PNG, JPG up to 10MB each</p>
          </div>
        </div>
        {errors.certifications && (
          <p className="mt-1 text-sm text-red-600">{errors.certifications.message}</p>
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