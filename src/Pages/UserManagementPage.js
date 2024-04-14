import React from "react";
import UserManagement from "../components/UserManagement/UserManagement";
import LayoutHome from "../layouts/LayoutHome";

export default function UserManagementPage() {
  return (
    <LayoutHome>
      <div>
        <UserManagement></UserManagement>
      </div>
    </LayoutHome>
  );
}
