import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import UserList from "../pages/user/UserList";
import StudentList from "../pages/student/StudentList";
import OrgList from "../pages/organization/OrgList";
import RoleList from "../pages/role/RoleList";
import GroupList from "../pages/group/GroupList";
import DepartList from "../pages/department/DepartList";
import Login from "../pages/Login";
import ProtectedRoute from "./ProtectedRoute";
import AuthRoute from "./AuthRoute";

export default function AppRouter() {
  return (
    <Routes>
      {/* Login Route */}
      <Route
        path="/login"
        element={
          <AuthRoute>
            <Login />
          </AuthRoute>
        }
      />

      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="user-list"
        element={
          <ProtectedRoute>
            <UserList />
          </ProtectedRoute>
        }
      />
      <Route
        path="student-list"
        element={
          <ProtectedRoute>
            <StudentList />
          </ProtectedRoute>
        }
      />
      <Route
        path="org-list"
        element={
          <ProtectedRoute>
            <OrgList />
          </ProtectedRoute>
        }
      />
      <Route
        path="role-list"
        element={
          <ProtectedRoute>
            <RoleList />
          </ProtectedRoute>
        }
      />
      <Route
        path="group-list"
        element={
          <ProtectedRoute>
            <GroupList />
          </ProtectedRoute>
        }
      />
      <Route
        path="department-list"
        element={
          <ProtectedRoute>
            <DepartList />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
