import { supabase } from './supabase';

export type Profile = {
  id: string;
  name: string | null;
  role: string | null;
  location: string | null;
  domain: string | null;
  avatar_url: string | null;
  email: string;
  skills: string[];
  interests: string[];
};

export async function getProfile(): Promise<Profile | null> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data: profile, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }

    // Fetch skills and interests separately
    const { data: skills } = await supabase
      .from('skills')
      .select('name')
      .eq('profile_id', user.id);

    const { data: interests } = await supabase
      .from('interests')
      .select('name')
      .eq('profile_id', user.id);

    if (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }

    if (!profile) return null;

    return {
      ...profile,
      skills: skills?.map((s) => s.name) || [],
      interests: interests?.map((i) => i.name) || []
    };
  } catch (error) {
    console.error('Error fetching profile:', error);
    return null;
  }
}

export async function updateProfile(profile: Partial<Profile>): Promise<void> {
  try {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) throw new Error('No user logged in');

    // Prepare profile updates without skills and interests
    const updates = {
      id: user.id,
      name: profile.name,
      role: profile.role,
      location: profile.location,
      domain: profile.domain,
      avatar_url: profile.avatar_url,
      email: user.email!,
      updated_at: new Date().toISOString(),
    };

    // Update profile
    const { error } = await supabase
      .from('profiles')
      .upsert(updates);

    if (error) throw error;

    // Update skills if provided
    if (profile.skills) {
      // Delete existing skills
      await supabase
        .from('skills')
        .delete()
        .eq('profile_id', user.id);

      // Insert new skills
      if (profile.skills.length > 0) {
        const skillsToInsert = profile.skills.map(name => ({
          profile_id: user.id,
          name,
        }));

        const { error: skillsError } = await supabase
          .from('skills')
          .insert(skillsToInsert);

        if (skillsError) throw skillsError;
      }
    }

    // Update interests if provided
    if (profile.interests) {
      // Delete existing interests
      await supabase
        .from('interests')
        .delete()
        .eq('profile_id', user.id);

      // Insert new interests
      if (profile.interests.length > 0) {
        const interestsToInsert = profile.interests.map(name => ({
          profile_id: user.id,
          name,
        }));

        const { error: interestsError } = await supabase
          .from('interests')
          .insert(interestsToInsert);

        if (interestsError) throw interestsError;
      }
    }
  } catch (error) {
    console.error('Error updating profile:', error);
    throw error;
  }
}