// Function to generate data
function generateUserData(namePrefix, emailDomain, count) {
  const userData = [];
  for (let i = 1; i <= count; i++) {
    const user = {
      name: `${namePrefix}${i}`,
      email: `${namePrefix}${i}@${emailDomain}`,
    };
    userData.push(user);
  }
  return userData;
}

// Example usage
const alice = {
  name: "Alice",
  email: "alice@prisma.io",
};

const reuben = {
  name: "Reuben",
  email: "reuben@prisma.io",
};

// Generate more data
const moreData = generateUserData("User", "prisma.io", 5);

// Export the data
module.exports = {
  alice,
  reuben,
  moreData,
};
