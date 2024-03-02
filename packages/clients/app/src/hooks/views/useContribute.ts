import { useQuery } from "@apollo/client";

import { campaignsQuery } from "@/modules/apollo";

import {
  useMakeContribution,
  MakeContributionDataProps,
} from "../contribution/useMakeContribution";
import { mockCampaigns } from "@/mockData";

export interface ContributeDataProps extends MakeContributionDataProps {
  campaigns: Campaign[];
}

export const useContribute = (): ContributeDataProps => {
  const { data: campaignsData } = useQuery<any[]>(campaignsQuery);

  const campaigns =
    campaignsData?.map((campaign) => {
      console.log(campaign);

      return {
        id: campaign.id,
        hypercertID: campaign.hypercertID,
        title: campaign.title,
        description: campaign.description,
        banner: campaign.banner,
        logo: campaign.logo,
        details: campaign.details,
        start_date: campaign.start_date,
        end_date: campaign.end_date,
        creator: campaign.creator,
        team: campaign.team,
        capitals: campaign.capitals,
        created_at: campaign.created_at,
      };
    }) || mockCampaigns;

  const contribution = useMakeContribution();

  return {
    campaigns,
    ...contribution,
  };
};