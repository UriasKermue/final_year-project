import { DoctorFormData } from "../types/doctor";
import { Check } from "lucide-react";
import clsx from "clsx";

interface Props {
  data: Partial<DoctorFormData>;
  onSubmit: () => void;
  onBack: () => void;
  isActive: boolean;
}

export function ReviewStep({ data, onSubmit, onBack, isActive }: Props) {
  return (
    <div
      className={clsx(
        "space-y-6 transition-opacity duration-300",
        !isActive && "opacity-50"
      )}
    >
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            Application Summary
          </h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">
            Please review your information before submitting.
          </p>
        </div>
        <div className="border-t border-gray-200 px-4 py-5 sm:px-6">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Full Name</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.fullName}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Email</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.email}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Phone</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.phone}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                License Number
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.licenseNumber}
              </dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">Specialty</dt>
              <dd className="mt-1 text-sm text-gray-900">{data.specialty}</dd>
            </div>
            <div className="sm:col-span-1">
              <dt className="text-sm font-medium text-gray-500">
                Years of Experience
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.yearsOfExperience}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                Hospital Affiliation
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                {data.hospitalAffiliation}
              </dd>
            </div>
            <div className="sm:col-span-2">
              <dt className="text-sm font-medium text-gray-500">
                Uploaded Documents
              </dt>
              <dd className="mt-1 text-sm text-gray-900">
                <ul className="border border-gray-200 rounded-md divide-y divide-gray-200">
                  {data.certifications && (
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                        <span className="ml-2 flex-1 w-0 truncate">
                          Certifications ({data.certifications.length} files)
                        </span>
                      </div>
                    </li>
                  )}
                  {data.governmentId && (
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                        <span className="ml-2 flex-1 w-0 truncate">
                          Government ID
                        </span>
                      </div>
                    </li>
                  )}
                  {data.profilePicture && (
                    <li className="pl-3 pr-4 py-3 flex items-center justify-between text-sm">
                      <div className="w-0 flex-1 flex items-center">
                        <Check className="flex-shrink-0 h-5 w-5 text-green-500" />
                        <span className="ml-2 flex-1 w-0 truncate">
                          Profile Picture
                        </span>
                      </div>
                    </li>
                  )}
                </ul>
              </dd>
            </div>
          </dl>
        </div>
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
            type="button"
            onClick={onSubmit}
            className="flex-1 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Submit Application
          </button>
        </div>
      )}
    </div>
  );
}
