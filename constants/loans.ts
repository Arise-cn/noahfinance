export type LoanContentSection = {
  id: string;
  title: string;
  paragraphs: readonly string[];
  imageSrc: string;
  imageAlt: string;
  imageSide: "left" | "right";
};

export type LoanSubRoute = {
  slug: string;
  /** Header 底部菜单文案（Figma 全大写） */
  navLabel: string;
  /** 页面主标题（H1，与 Figma 一致） */
  pageTitle: string;
  sections: readonly LoanContentSection[];
};

export const LOAN_SUB_ROUTES: readonly LoanSubRoute[] = [
  {
    slug: "residential",
    navLabel: "RESIDENTIAL",
    pageTitle: "RESIDENTIAL LOANS",
    sections: [
      {
        id: "first-home",
        title: "First Home Buyer",
        imageSide: "left",
        imageSrc: "/images/loans/loans_residentiaal_fisthomebuyer.webp",
        imageAlt: "Modern residential home",
        paragraphs: [
          "Purchase of your first home is a big decision and not to be taken lightly. We understand you may experience feelings of confusion as to which lender or product offers the best solution for your requirements, intimidation in the face of questioning, providing data, arranging appointments, and apprehension about making the correct decision or choice.",
          "With Noah working on your behalf we remove or minimize these negatives supporting you through our extensive list of lenders and drawing on our experience in the industry saving you both time and money.",
        ],
      },
      {
        id: "refinance",
        title: "Refinance",
        imageSide: "right",
        imageSrc: "/images/loans/loans_residential_refinance.webp",
        imageAlt: "Professional consultation",
        paragraphs: [
          'A mortgage should not be "set and forget". Borrowers should put their mortgage through an occasional health check. People\'s circumstances change, lending policies change — a home loan should be reviewed occasionally to ensure your loan still meets your requirements and is the most cost-effective currently available on the market.',
        ],
      },
      {
        id: "construction",
        title: "Construction Loans",
        imageSide: "left",
        imageSrc: "/images/loans/loans_residential_construction.webp",
        imageAlt: "Construction site",
        paragraphs: [
          "If you are considering purchase of vacant land and building on that land we have extensive experience with construction lending. Construction lending can be more complicated than the purchase of an established home.",
        ],
      },
      {
        id: "non-resident",
        title: "Non-Resident Loans",
        imageSide: "right",
        imageSrc: "/images/loans/loans_residential_nonresident.webp",
        imageAlt: "Residential building exterior",
        paragraphs: [
          "Noah can help non-residents, expatriates, new or returning residents of Australia secure cost-effective and flexible mortgage funding with approvals to buy property. You may be looking at borrowing using foreign income, or investing to maintain a foreign residence, or investing via your personal pension fund. We help you to find the loan — and property — that best suits your unique investment objectives.",
        ],
      },
    ],
  },
  {
    slug: "commercial",
    navLabel: "COMMERCIAL",
    pageTitle: "COMMERCIAL LOANS",
    sections: [
      {
        id: "commercial-properties",
        title: "Commercial Properties",
        imageSide: "left",
        imageSrc: "/images/loans/loans_commercial_commercial.webp",
        imageAlt: "Commercial office buildings",
        paragraphs: [
          "Whether you are acquiring owner-occupied premises, expanding operations, or refinancing an existing facility, we structure commercial property finance with clarity — from covenant and security expectations through to settlement.",
          "We work across major banks and specialist lenders to match loan structure to your cash flow, security profile, and growth plans, keeping the process efficient while you stay focused on the business.",
        ],
      },
      {
        id: "specialised",
        title: "Specialised Properties",
        imageSide: "right",
        imageSrc: "/images/loans/loans_commercial_specialised.webp",
        imageAlt: "Hospitality property exterior",
        paragraphs: [
          "Specialised real estate properties are usually purpose-built properties such as pubs, hotels, motels, petrol stations, caravan parks, retirement villages and childcare facilities — they differ in nature and function from residential properties. Noah provides structured optimum solutions to support the complex requirements of such special investments.",
        ],
      },
      {
        id: "development",
        title: "Development Loan",
        imageSide: "left",
        imageSrc: "/images/loans/loans_commercial_development.webp",
        imageAlt: "Property development",
        paragraphs: [
          "Noah Finance offers our clients tailor-made property development finance solutions, regardless of their complexities. We thrive on the more complex property development finance scenarios. When it comes to addressing complexity, we approach it in a spirit of true partnership, working closely with our clients to reach the optimal solution. We can assist with the entire project development cycle from funding the initial land purchase, raising funds on pre-DA land, funding the construction stage through to refinancing the completed stock to ensure a greater level of success.",
        ],
      },
    ],
  },
  {
    slug: "asset-finance",
    navLabel: "ASSET FINANCE",
    pageTitle: "ASSET FINANCE",
    sections: [
      {
        id: "auto",
        title: "Auto Finance",
        imageSide: "left",
        imageSrc: "/images/loans/loans_asset_autofinance.webp",
        imageAlt: "Sports car on the road",
        paragraphs: [
          "Buying a car is a big investment. So, you want to get it right without being stuck with a bad finance deal.",
          "Noah takes the worry out of car finance by finding the right loan products for you. Not all car loans are created equal. We know the difference between good, bad and a great deal. Let us help you with the comparison while you focus on what's more important: having fun car shopping to find the one that best suits your needs, lifestyle and budget!",
          "But a word of caution before you begin test driving. Get your car finance sorted before you start approaching car dealers. This means you're clear on your maximum budget and payment terms before going for a test drive. This puts you in a stronger negotiating position with dealers and maximises your chance of getting a great price on your car purchase even in the case of second-hand car purchase.",
          "We can also help you with car loan pre-approval, refinancing and self-employed car loans.",
        ],
      },
      {
        id: "equipment",
        title: "Equipment Finance",
        imageSide: "right",
        imageSrc: "/images/loans/loans_asset_equipment.webp",
        imageAlt: "Industrial equipment",
        paragraphs: [
          "Equipment financing represents a specialized form of funding designed to get physical (or software) assets into the hands of businesses. If you're looking for equipment financing, you're looking for a loan that uses the equipment you're buying as security, or you're looking for a lease (either a finance lease or an operating lease i.e. rental).",
          "Because it's a more niche form of financing, it can be a little more challenging to track down equipment financers than ones who deal in working capital. Noah gives you a head start by presenting some of the best equipment financers. Some examples of finance for this category include franchise finance, equipment leasing and chattel mortgages, cash flow finance and small business loans. We can assist you in finding short and long-term asset financing for your business, whether as a startup or for expansion, and guide you through the whole process.",
        ],
      },
    ],
  },
] as const;

export const LOAN_SLUGS = LOAN_SUB_ROUTES.map((r) => r.slug);

export function getLoanBySlug(slug: string): LoanSubRoute | undefined {
  return LOAN_SUB_ROUTES.find((r) => r.slug === slug);
}
