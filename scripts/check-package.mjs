const packageName = "@tmatsiievskyi/react_ui";

async function checkPackageVisibility(packageName) {
  try {
    const response = await fetch(`https://registry.npmjs.org/${packageName}`);

    if (response.ok) {
      const data = await response.json();
      console.log(`Package ${packageName} is public.`);
      console.log("Latest version:", data["dist-tags"].latest);
    } else if (response.status === 404) {
      console.log(`Package ${packageName} is not found.`);
    } else {
      console.log(
        `Unexpected status when checking ${packageName}:`,
        response.status,
      );
    }
  } catch (error) {
    console.error("Error checking package visibility:", error);
  }
}

checkPackageVisibility(packageName);
