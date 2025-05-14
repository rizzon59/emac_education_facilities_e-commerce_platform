
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface ProfileHeaderProps {
  user: {
    name: string;
    email: string;
    institution: string;
    address: string;
  };
  onEditProfile: () => void;
}

const ProfileHeader = ({ user, onEditProfile }: ProfileHeaderProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome, {user.name}</CardTitle>
        <CardDescription>{user.institution}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">{user.email}</p>
        <p className="text-sm text-gray-500 mt-1">{user.address}</p>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full" onClick={onEditProfile}>
          Edit Profile
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileHeader;
