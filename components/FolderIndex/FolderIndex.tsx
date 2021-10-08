import Link from 'next/link';

interface IFolderIndex {
  folderIndex: any[],
}

export default function FolderIndex({
  folderIndex,
}: IFolderIndex) {
  return (
    <div className="folder-index">
      {folderIndex.map((page) => (
        <Link key={page.full_slug} href={`/${page.full_slug}`}>
          <a className="folder-index__link" style={{ display: 'block', marginBottom: 24 }}>
            {page.content.seo?.title || page.full_slug}
            <br />
            {page.content.seo?.description}
          </a>
        </Link>
      ))}
    </div>
  );
}
