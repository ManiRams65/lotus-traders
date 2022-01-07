import { useState } from "react";
import { baseUrl } from '../../config/config'
import helper from '../../config/auth-helper'
import { TrashIcon } from '@heroicons/react/outline'
import Loader from '../../components/loader'
import { toast } from "react-toastify";

export default function Inventory({ result }) {
  const [consumers, setConsumers] = useState(result)
  const [loader, setLoader] = useState(false);

  const deleteUser = (user, indx) => {
    setLoader(true);
    helper.axiosInstance.delete(`consumers/${user.id}`).then(res => {
      console.log(res);
      const temp = consumers;
      temp.splice(indx, 1);
      setConsumers([...temp])
      setLoader(false);
      toast.success('Removed user.')
    }).catch(err => {
      console.log(err);
      toast.error('Something went wrong...')
    })
  }

  return (
    <div className="flex flex-col">
      {loader && <Loader text="Please wait..." />}
      <div className="my-5 md:my-10 overflow-x-auto mx-6 lg:mx-8">
        <h1 className="text-md font-bold">User Management</h1>
        <div className="lg:mt-10 py-2 align-middle inline-block min-w-full sm:px-4">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    First Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Last Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Acct. Created On
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {consumers.map((person, indx) => (
                  <tr key={person.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {person.firstName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {person.lastName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {person.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(person.created).toDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <TrashIcon className="w-6 h-6 text-red-400 hover:text-red-600" onClick={() => deleteUser(person, indx)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export async function getServerSideProps(ctx) {
  // request products from api
  let response = await fetch(`${baseUrl}/consumers`);
  // extract the data
  let result = await response.json();

  return {
    props: {
      result
    },
  };
}