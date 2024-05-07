import React from "react";
import DocumentManagement from "../components/DocumentManagement/DocumentManagement";
import LayoutHome from "../layouts/LayoutHome";

export default function DocumentManagementPage() {
  return (
    <LayoutHome>
      <div>
        <DocumentManagement />
      </div>
    </LayoutHome>
  );
}
