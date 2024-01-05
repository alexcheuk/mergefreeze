import {
  Button,
  Chip,
  Input,
  Link,
  Spacer,
  Spinner,
  Tab,
  Tabs,
  Textarea,
} from '@nextui-org/react'
import { useManageViewController } from './useManageViewController'

export const ManageView = () => {
  const {
    installation,
    isLoading,
    showOnboardingSteps,
    isMissingGithubInstallation,
    isMissingSlackIntegration,
    removeInstallation,
  } = useManageViewController()

  return isLoading ? (
    <Spinner />
  ) : showOnboardingSteps ? (
    <div className='max-w-md'>
      <div className={!isMissingGithubInstallation ? 'opacity-25' : ''}>
        <h4 className='text-slate-900 font-extrabold text-4xl sm:text-xl dark:text-white'>
          1. Install Github App to your projects
        </h4>

        <Spacer y={4} />

        {isMissingGithubInstallation ? (
          <Button
            as={Link}
            href={`https://github.com/apps/slash-merge-freeze-dev/installations/new`}
            color={'primary'}
            variant='bordered'
          >
            Install to Github
          </Button>
        ) : (
          <Button
            as={Link}
            href={`https://github.com/apps/slash-merge-freeze-dev/installations/new`}
            color={'default'}
            isDisabled
            variant='bordered'
          >
            Installed to Github
          </Button>
        )}
      </div>

      <Spacer y={8} />

      <h4 className='text-slate-900 font-extrabold text-4xl sm:text-xl dark:text-white'>
        2. Install Slack App into Workspace
      </h4>

      <Spacer y={4} />

      <Button
        as={Link}
        href='/slack/install'
        color='primary'
        disabled={!isMissingSlackIntegration}
      >
        Add to Slack Workspace
      </Button>
    </div>
  ) : (
    <div className='max-w-lg'>
      <p className='text-slate-900 font-bold sm:text-l'>
        Status:{' '}
        <Chip variant={'bordered'} color='warning'>
          Unfrozen
        </Chip>
        <Button color='primary'>Merge freeze</Button>
      </p>
      <Spacer y={8} />
      <Tabs aria-label='Options'>
        <Tab key='photos' title='Configuration'>
          <h4 className='text-slate-900 font-bold sm:text-l'>
            Allowed channels
          </h4>
          <Spacer y={2} />
          <Input />
          <Spacer y={8} />

          <h4 className='text-slate-900 font-bold sm:text-l'>Merge message</h4>
          <Spacer y={2} />
          <Textarea
            value={`:snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake:
        *MERGE FREEZE* - TEXT
        :snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake::snowflake:`}
          />
          <Spacer y={8} />

          <Button color='primary'>Save</Button>
          <Button color='primary' onClick={removeInstallation}>
            Remove installation
          </Button>
        </Tab>
        <Tab key='music' title='History'>
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
          nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur.
        </Tab>
      </Tabs>
    </div>
  )
}
