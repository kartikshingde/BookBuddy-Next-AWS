export default function ProfilePage() {
  const user = {
    name: 'John Doe',
    email: 'john@example.com',
    city: 'Pune',
    joined: 'Jan 2024',
  };

  return (
    <div className="max-w-md mx-auto mt-16 px-6">
      <h1 className="text-4xl font-extrabold text-blue-700 dark:text-blue-400 mb-8 text-center">
        Your Profile
      </h1>

      <div className="bg-white dark:bg-gray-900 shadow-lg rounded-xl p-8 space-y-6">
        <ProfileItem label="Name" value={user.name} />
        <ProfileItem label="Email" value={user.email} />
        <ProfileItem label="City" value={user.city} />
        <ProfileItem label="Member Since" value={user.joined} />
      </div>
    </div>
  );
}

function ProfileItem({ label, value }) {
  return (
    <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-3 last:border-0">
      <span className="text-gray-600 dark:text-gray-400 font-medium">{label}:</span>
      <span className="text-gray-900 dark:text-gray-100 font-semibold">{value}</span>
    </div>
  );
}
