

export default function Footer() {
    let today = new Date(Date.now())
    return (
        <footer className='bg-slate-900 text-white py-4 text-center'>
        <p>
            Olimpiada Iberoamericana de Matemática
        </p>
        <p>
            © {today.getFullYear()}
        </p>
        </footer>
    );
}