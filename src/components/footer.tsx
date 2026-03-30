import Link from 'next/link';

export function Footer() {
  return (
    <footer className="py-12 border-t border-gray-800 bg-black">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-center items-center gap-4">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-gray-500 text-sm">
            <span>© 2026 意心会. All rights reserved.</span>
            <a 
              href="https://beian.miit.gov.cn" 
              target="_blank" 
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              渝ICP备2026003734号-1
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
