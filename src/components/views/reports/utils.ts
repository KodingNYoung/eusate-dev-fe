import overPerformanceImg from "@/assets/images/reports/overall-performance.svg"
import overPerformanceImgSm from "@/assets/images/reports/overall-performance-sm.svg"
import ticketResolutionImg from "@/assets/images/reports/ticket-resolution-analysis.svg"
import ticketResolutionImgSm from "@/assets/images/reports/ticket-resolution-analysis-sm.svg"
import aiVsHumanImg from "@/assets/images/reports/ai-vs-human.svg"
import aiVsHumanImgSm from "@/assets/images/reports/ai-vs-human-sm.svg"
import csatImg from "@/assets/images/reports/customer-sat.svg"
import csatImgSm from "@/assets/images/reports/customer-sat-sm.svg"
import workloadDistributionImg from "@/assets/images/reports/workload-distribution.svg"
import workloadDistributionImgSm from "@/assets/images/reports/workload-distribution-sm.svg"
import { ReportType } from "../report/utils"

export const REPORTS = [
  {
    id: ReportType.OVERALL_PERFORMANCE,
    title: "Overall Performance Summary Report",
    description:
      "A high-level view of key metrics (ticket volume, resolution times, FCR, etc.) across the entire support operation.",
    img: overPerformanceImg,
    imgSm: overPerformanceImgSm,
  },
  {
    id: ReportType.TICKET_RESOLUTION,
    title: "Ticket Resolution Analysis Report",
    description:
      "An in-depth analysis of ticket resolution patterns, including time to resolution, first contact resolution rates, and common issues.",
    img: ticketResolutionImg,
    imgSm: ticketResolutionImgSm,
  },
  {
    id: ReportType.AI_VS_HUMAN,
    title: "AI vs. Human Performance Report",
    description:
      "A comparative analysis of AI and human agent performance, highlighting strengths, weaknesses, and areas for improvement.",
    img: aiVsHumanImg,
    imgSm: aiVsHumanImgSm,
  },
  {
    id: ReportType.CUSTOMER_SATISFACTION,
    title: "Customer Satisfaction & Sentiment Report",
    description:
      "An analysis of customer satisfaction scores, feedback trends, and areas for improvement based on customer interactions.",
    img: csatImg,
    imgSm: csatImgSm,
  },
  {
    id: ReportType.WORKLOAD_DISTRIBUTION,
    title: "Workload Distribution & Efficiency Report",
    description:
      "An analysis of agent workload distribution, efficiency metrics, and recommendations for optimizing resource allocation.",
    img: workloadDistributionImg,
    imgSm: workloadDistributionImgSm,
  },
]
