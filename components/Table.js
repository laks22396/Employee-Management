import { useSelector, useDispatch } from "react-redux";
import { PencilSVG, TrashSVG } from "@/icons";
import {
  deleteEmployee,
  fetchEmployees,
  setModalOpen,
  setSelectedEmployee,
} from "@/store";
import { useEffect } from "react";

export function Table() {
  const state = useSelector((state) => state.employee);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  return (
    <table className="table">
      <thead className="table__head">
        <tr>
          <th>Profile Picture</th>
          <th>Full name</th>
          <th>Age</th>
          <th>Salary</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody className="table__body">
        {state.employeeList.map(({ _id, name, age, salary, profileImage }) => (
          <tr key={_id}>
            <td>
              {profileImage && (
                <img
                  src={profileImage}
                  //alt={`${name}'s Profile`}
                  className="profile-image"
                  style={{ width: '35mm', height: '35mm', objectFit: 'cover', borderRadius: '50%' }}
                />
              )}
            </td>
            <td>{name}</td>
            <td>{age}</td>
            <td>{salary}</td>
            <td>
              <button
                className="btn btn__compact btn__edit"
                onClick={() => {
                  dispatch(setSelectedEmployee(_id));
                  dispatch(setModalOpen(true));
                }}
              >
                <PencilSVG />
              </button>
              <button
                className="btn btn__compact btn__delete"
                onClick={() => {
                  dispatch(deleteEmployee(_id));
                }}
              >
                <TrashSVG />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
