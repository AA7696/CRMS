import React from 'react'

function LeadList() {
  return (
    <>
                        <div className="bg-base-100 p-4  shadow-md flex flex-row justify-between h-[350px] w-full">
                        <div className="flex flex-col gap-2 w-full">
                            <div className="overflow-x-auto  w-full">
                                <table className="table">
                                    {/* Rememer to add pagination in this page */}
                                    {/* Headers of the Table */}
                                    <thead>
                                        <tr>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" />
                                                </label>
                                            </th>
                                            <th>Name</th>
                                            <th>Job</th>
                                            <th>Favorite Color</th>
                                            <th>Actions</th>
                                            <th>Email Address</th>
                                            <th>Phone No</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {/* row 1 */}
                                        <tr>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" />
                                                </label>
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src="https://img.daisyui.com/images/profile/demo/2@94.webp"
                                                                alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">Hart Hagerty</div>
                                                        <div className="text-sm opacity-50">United States</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                Zemlak, Daniel and Leannon
                                                <br />
                                                <span className="badge badge-ghost badge-sm">Desktop Support Technician</span>
                                            </td>
                                            <td>Purple</td>
                                        </tr>
                                        {/* row 2 */}
                                        <tr>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" />
                                                </label>
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src="https://img.daisyui.com/images/profile/demo/3@94.webp"
                                                                alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">Brice Swyre</div>
                                                        <div className="text-sm opacity-50">China</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                Carroll Group
                                                <br />
                                                <span className="badge badge-ghost badge-sm">Tax Accountant</span>
                                            </td>
                                            <td>Red</td>
                                        </tr>
                                        {/* row 3 */}
                                        <tr>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" />
                                                </label>
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src="https://img.daisyui.com/images/profile/demo/4@94.webp"
                                                                alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">Marjy Ferencz</div>
                                                        <div className="text-sm opacity-50">Russia</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                Rowe-Schoen
                                                <br />
                                                <span className="badge badge-ghost badge-sm">Office Assistant I</span>
                                            </td>
                                            <td>Crimson</td>
                                        </tr>
                                        {/* row 4 */}
                                        <tr>
                                            <th>
                                                <label>
                                                    <input type="checkbox" className="checkbox" />
                                                </label>
                                            </th>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <div className="avatar">
                                                        <div className="mask mask-squircle h-12 w-12">
                                                            <img
                                                                src="https://img.daisyui.com/images/profile/demo/5@94.webp"
                                                                alt="Avatar Tailwind CSS Component" />
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div className="font-bold">Yancy Tear</div>
                                                        <div className="text-sm opacity-50">Brazil</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td>
                                                Wyman-Ledner
                                                <br />
                                                <span className="badge badge-ghost badge-sm">Community Outreach Specialist</span>
                                            </td>
                                            <td>Indigo</td>

                                        </tr>


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

    </>
  )
}

export default LeadList