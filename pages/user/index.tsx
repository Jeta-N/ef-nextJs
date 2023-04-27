import { WithDefaultLayout } from '@/components/DefautLayout';
import { Title } from '@/components/Title';
import { Page } from '@/types/Page';
import { useSwrFetcherWithAccessToken } from '@/functions/useSwrFetcherWithAccessToken';
import useSwr from 'swr';
// import { GetUserCursorPaginationModel, GetUserModel, UserOffsetModel } from '@/functions/swagger/BelajarNextJsBackEnd';
import { GetUserCursorPaginationModel, GetUserModel } from '@/functions/swagger/BelajarNextJsBackEnd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faRemove } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useState } from 'react'

const UserDisplayItem: React.FC<{
    user: GetUserModel
}> = ({ user }) => {
    return (
        <tr>
            <td className="border px-4 py-2">{user.id}</td>
            <td className="border px-4 py-2">{user.username}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">
                <Link href={`/user/edit/${user.id}`} className="inline-block py-1 px-2 text-xs bg-blue-500 text-white rounded-lg">
                    <FontAwesomeIcon className='mr-1' icon={faEdit}></FontAwesomeIcon>
                    Edit
                </Link>
                <button className="ml-1 py-1 px-2 text-xs bg-red-500 text-white rounded-lg">
                    <FontAwesomeIcon className='mr-1' icon={faRemove}></FontAwesomeIcon>
                    Delete
                </button>
            </td>
        </tr>
    );
};

const IndexPage: Page = () => {
    // const [pageIndex, setPageIndex] = useState(0);
    const [url, setUrl] = useState("api/User/cursor-pagination?limit=1");

    const fetcher = useSwrFetcherWithAccessToken();

    //offset
    // const { data } = useSwr<UserOffsetModel>(`/api/be/api/User/offset-pagination?limit=2&offset=${pageIndex}`, fetcher);

    //cursor
    const { data } = useSwr<GetUserCursorPaginationModel>(`/api/be/${url}`, fetcher);

    return (
        <div>
            <Title>Home</Title>

            <table className='table-auto mt-5'>
                <thead className='bg-slate-700 text-white'>
                    <tr>
                        <th className='px-4 py-2'>ID</th>
                        <th className='px-4 py-2'>Name</th>
                        <th className='px-4 py-2'>Email</th>
                        <th className='px-4 py-2'></th>
                    </tr>
                </thead>
                <tbody>
                    {data?.listOfUsers?.map((x, i) => <UserDisplayItem key={i} user={x}></UserDisplayItem>)}
                </tbody>
            </table>
            {/* Offset */}
            {/* <button onClick={() => setPageIndex(pageIndex - 1)} type='button'>Prev</button>
            <button onClick={() => setPageIndex(pageIndex + 1)} type='button'>Next</button> */}

            {/* Cursor */}
            <button onClick={() => setUrl(data?.prevCursor != null ? data?.prevCursor : "")} type='button'>Prev</button>
            <button onClick={() => setUrl(data?.nextCursor != null ? data?.nextCursor : "")} type='button'>Next</button>
        </div>
    );
}

IndexPage.layout = WithDefaultLayout;
export default IndexPage;
