export const setOrganizationColor = (name) => {
  switch (name) {
    case "World Vision":
      return "#1E40AF";
    case "Plan International":
      return "#059669";
    case "MINEMA":
      return "#DC2626";
    case "Prison Fellowship":
      return "#7C3AED";
    case "Save the Children":
      return "#EA580C";
    default:
      return "#6B7280"; 
  }
};

export const setOrganizationIcon = (name) => {
  switch (name) {
    case "World Vision":
      return "GraduationCap";
    case "Plan International":
      return "Heart";
    case "MINEMA":
      return "Shield";
    case "Prison Fellowship":
      return "Scale";
    case "Save the Children":
      return "Stethoscope";
    default:
      return "Building"; 
  }
};
