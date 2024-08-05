import { permanentRedirect } from 'next/navigation';

export default function Auth() {
    permanentRedirect('/auth/login')
}
